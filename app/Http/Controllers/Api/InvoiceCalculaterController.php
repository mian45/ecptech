<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\VisionPlan;
use App\Models\LenseType;
use App\Models\Brand;
use App\Models\Code;
use App\Models\Collection;
use App\Models\Lense;
use App\Models\Characteristic;
use App\Models\LensMaterial;
use App\Models\Shipping;
use App\Models\Tax;
use App\Models\Discount;
use App\Models\AddonType;
use App\Models\AddOn;
use App\Models\AddonExtra;
use Validator;
use Illuminate\Validation\ValidationException;



class InvoiceCalculaterController extends Controller
{
    public function calculaterData (Request $request){

        $data['shipping'] = "";
        $data['tax'] = "";
        $data['discount'] = "";

        $user=auth()->user();

        $userId=$user->id;
        if($user->role_id===3){
            $userId=  $user->client_id;
        }


        $shipping = Shipping::where('user_id',$userId)->orderBy('created_at', 'desc')->first();
        if($shipping){
            $data['shipping'] = $shipping->value;
        }

        $discount = Discount::select('id','user_id','name','value','status')->where('user_id',$userId)->orderBy('created_at', 'desc')->get();
        if($discount){
            $data['discount'] = $discount;
        }

        $tax = Tax::where('user_id',$userId)->orderBy('created_at', 'desc')->get();
        if($tax){
            $data['tax'] = $tax;
        }

        $data['addons'] = AddonType::with(['addons' => function($q)use($userId){
            $q->join('user_addon_settings as setting','setting.addon_id','=','addons.id');
            $q->select('addons.id','addons.addon_type_id','addons.title','setting.status','setting.display_name','setting.price','setting.addon_id');
            $q->where('setting.user_id',$userId)->where('setting.status','active');
        }])->select('id','title')->get();




        $data['questions'] = VisionPlan::with(['question_permissions' => function($q)use($userId){
                $q->join('questions as q','q.id','=','question_permissions.question_id');
                $q->select('q.id as q_id','question_permissions.vision_plan_id','q.title as question',
                    DB::raw('IF(question_permissions.status, "true", "false") as visibility'),
                    DB::raw('IF(question_permissions.optional, "true", "false") as optional')
                );
                $q->where('question_permissions.user_id',$userId);
                $q->where('question_permissions.status',1);
        }])->join('vision_plan_permissions as vsp','vsp.vision_plan_id','=','vision_plans.id')
            ->where('vsp.user_id',$userId)
            ->where('vsp.status',1)
            ->select('vision_plans.id','vision_plans.title')->get();




       $data['lens_material'] = LensMaterial::leftjoin('user_lense_material_settings as setting','setting.lens_material_id','=','lens_materials.id')
                                            ->select('lens_materials.id','lens_materials.lens_material_title','setting.price as retail_price','setting.display_name')
                                            ->where('setting.user_id',$userId)
                                            ->where('setting.status','active')
                                            ->get();

        return $this->sendResponse($data, 'Calculater Data');
    }

    public function storeCSVData(Request $request){

        $validator = Validator::make($request->all(), [
            'csv' => 'required|mimes:csv,txt'
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $csv = array();

        if($_FILES['csv']['error'] == 0){
            $tmpName = $_FILES['csv']['tmp_name'];

            if(($handle = fopen($tmpName, 'r')) !== FALSE) {

                DB::beginTransaction();

                $row = 0;
                try{
                    while(($data = fgetcsv($handle, 1000, ',')) !== FALSE) {
                        if($row==0){
                            // number of fields in the csv
                            $col_count = count($data);
                        }else{
                            $data = $this->clear_encoding_str($data);
                            if(!empty($data[0])){
                                $vision_plan = VisionPlan::updateOrCreate(['title'=> $data[0]]);
                            }

                            if(!empty($data[1])){
                                $lens_type = LenseType::updateOrCreate(
                                    ['title'=> $data[1], 'vision_plan_id'=>$vision_plan->id]
                                );
                            }


                            if(!empty($data[2])){
                                if(strtolower($data[2]) == 'null'){
                                    $title = 'No Brand';
                                }else{
                                    $title = $data[2];
                                }
                                $brand = Brand::updateOrCreate(
                                    ['title'=> $title, 'lens_type_id'=>$lens_type->id]
                                );
                            }

                            if(!empty($data[3])){
                                $collection = Collection::updateOrCreate(
                                    ['title'=> $data[3], 'brand_id'=>$brand->id]
                                );
                            }

                            if(!empty($data[4])){
                                if(strtolower($data[4]) == 'null'){
                                    $material_id = null;
                                }else{
                                    $material_id = (LensMaterial::updateOrCreate(
                                        ['lens_material_title'=> $data[4]]
                                    ))->id;
                                }


                            }

                            if(!empty($data[5])){
                                $lense = Lense::create(
                                    ['title'=> $data[5], 'collection_id'=>$collection->id, "lens_material_id"=>$material_id]
                                );
                            }

                            if(!empty($data[6])){

                                $code_id = null;
                                if(!empty($data[7])){

                                    if(!empty($data[1])){
                                        if(strtolower($data[1]) == 'bifocal' OR strtolower($data[1]) == 'trifocal' ){
                                            $check_lensetype = "biofocal";
                                        }else{
                                            $check_lensetype = "other";
                                        }
                                    } 
                                    
                                    if($check_lensetype == 'biofocal'){
                                        $code = Code::where('name',$data[7])->where('vision_plan_id',$vision_plan->id)->where('lense_type','bifocal')->first();
                                    }
                                    else{
                                        $code = Code::where('name',$data[7])->where('vision_plan_id',$vision_plan->id)->whereNull('lense_type')->first();
                                    }

                                    if($code){
                                        $code_id = $code->id;
                                    }
                                }

                                $type = null;
                                if(!empty($data[8])){
                                    $type = strtolower($data[8]);
                                }
                                $characteristic = Characteristic::create(
                                    ['title'=> $data[6], 'lense_id'=>$lense->id, "code_id"=>$code_id, "type"=>$type]
                                );

                                if(!empty($data[9])){
                                    $category = $data[9];
                                    $collection_obj = Collection::find($collection->id);
                                    $collection_obj->category = $category;
                                    $collection_obj->save();

                                }
                            }

                        }

                        $row++;
                    }
                    fclose($handle);
                    DB::commit();

                    return $this->sendResponse([], 'CSV data uploaded');
                }catch(\Exception $e){
                    DB::rollback();
                    return $this->sendError($e->getMessage());

                }

            }
        }


    }


    public function storeAddonCSVData(Request $request){

        $validator = Validator::make($request->all(), [
            'csv' => 'required|mimes:csv,txt'
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $csv = array();

        if($_FILES['csv']['error'] == 0){
            $tmpName = $_FILES['csv']['tmp_name'];

            if(($handle = fopen($tmpName, 'r')) !== FALSE) {

                DB::beginTransaction();

                $row = 0;
                try{
                    while(($data = fgetcsv($handle, 1000, ',')) !== FALSE) {
                        if($row==0){
                            // number of fields in the csv
                            $col_count = count($data);
                        }else{
                            $data = $this->clear_encoding_str($data);

                            if(!empty($data[0])){
                                $addon_type = AddonType::updateOrCreate(['title'=> $data[0]]);
                            }

                            if(!empty($data[1])){
                                $addon = AddOn::updateOrCreate(
                                    ['title'=> $data[1], 'addon_type_id'=>$addon_type->id]
                                );
                            }

                            if(!empty($data[2])){
                                $addon_extra = AddonExtra::updateOrCreate(
                                    ['title'=> $data[2], 'addon_id'=>$addon->id]
                                );
                            }

                        }

                        $row++;
                    }
                    fclose($handle);
                    DB::commit();

                    return $this->sendResponse([], 'Addon CSV data uploaded');
                }catch(\Exception $e){
                    DB::rollback();
                    return $this->sendError($e->getMessage());

                }

            }
        }


    }

    public function storeCodeCSVData(Request $request){
        $validator = Validator::make($request->all(), [
            'csv' => 'required|mimes:csv,txt'
        ]);
        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $csv = array();

        if($_FILES['csv']['error'] == 0){
            $tmpName = $_FILES['csv']['tmp_name'];

            if(($handle = fopen($tmpName, 'r')) !== FALSE) {

                DB::beginTransaction();
                $row = 0;
                try{
                    while(($data = fgetcsv($handle, 1000, ',')) !== FALSE) {
                        if($row==0){
                            // number of fields in the csv
                            $col_count = count($data);
                        }else{
                            $data = $this->clear_encoding_str($data);
                            if(!empty($data[0])){
                                $vision_plan = VisionPlan::where('title', $data[0])->first();
                            }

                            if(!empty($data[1])){
                                $price = str_replace('$','',$data[2]);
                                $code = str_replace(' ', '', $data[1]);

                                if(is_numeric($price)){

                                    $price = (float)$price;
                                    $code = Code::updateOrCreate(
                                        ['vision_plan_id'=>$vision_plan->id,'lense_type'=>NULL,'name'=>$code],
                                        ['price'=> $price]
                                    );

                                }else{
                                    $code = Code::updateOrCreate(
                                        ['vision_plan_id'=>$vision_plan->id,'lense_type'=>NULL,'name'=>$code],
                                        ['price_formula'=> $price]
                                    );
                                }


                                $price_bifocal = str_replace('$','',$data[3]);
                                $code_biofocal = str_replace(' ', '', $data[1]);
                                if(is_numeric($price_bifocal)){

                                    $price_bifocal = (float)$price_bifocal;
                                    $code = Code::updateOrCreate(
                                        ['vision_plan_id'=>$vision_plan->id,'lense_type'=>'bifocal','name'=>$code_biofocal],
                                        ['price'=> $price_bifocal]
                                    );

                                }else{
                                    $code = Code::updateOrCreate(
                                        ['vision_plan_id'=>$vision_plan->id,'lense_type'=>'bifocal','name'=>$code_biofocal],
                                        ['price_formula'=> $price_bifocal]
                                    );
                                }

                            }
                        }

                        $row++;
                    }
                    fclose($handle);
                    DB::commit();
                    return $this->sendResponse([], 'Code CSV data uploaded');
                }catch(\Exception $e){
                    DB::rollback();
                    return $this->sendError($e->getMessage());

                }

            }
        }


    }



    private function clear_encoding_str($value)
    {
        if (is_array($value)) {
            $clean = [];
            foreach ($value as $key => $val) {
                $clean[$key] = trim(preg_replace('/[\t\n\r\s]+/', ' ', mb_convert_encoding($val, 'UTF-8', 'UTF-8')));
            }
            return $clean;
        }
        return mb_convert_encoding($value, 'UTF-8', 'UTF-8');
    }


    public function getLensePrices(Request $request){

        $validator = Validator::make($request->all(), [
            'vision_plan_id' => 'required',
            'lense_type_id' => 'required',
            'collection_id' => 'required',
            'lense_material_id' => 'required'

        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $data['lenses_price'] = Collection::where('id',$request->collection_id)->with(['lenses'=>function($q){

                        $q->leftjoin('lens_materials', 'lenses.lens_material_id', '=', 'lens_materials.id');
                        $q->where('lenses.lens_material_id',request()->lense_material_id);
                        $q->select('lenses.id','collection_id','lens_material_id','title','lens_materials.lens_material_title');
                        $q->with(['characteristics' => function($q){
                            $q->leftjoin('codes', 'characteristics.code_id', '=', 'codes.id');
                            $q->select('characteristics.id','characteristics.title','characteristics.lense_id','characteristics.type','characteristics.code_id','codes.name','codes.price','codes.price_formula');
                        }]);
                    }])->select('id','title')->get();


        return $this->sendResponse($data, 'Calculater Data');

    }

    public function getCollections(Request $request){
        
        $validator = Validator::make($request->all(), [
            'vision_plan_id' => 'required'            
        ]);
        
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        
        $user=auth()->user();
        
        $userId=$user->id;
        if($user->role_id===3){
            $userId=  $user->client_id;
        }
        
        
        $data['collection'] = LenseType::with(['brands'=>function($q)use($userId){
                    $q->join('brand_permissions as bp','bp.brand_id','=','brands.id');
                    $q->select('brands.id','lens_type_id','title');
                    $q->where('bp.user_id',$userId);
                    
                    $q->with(['collections'=>function($q)use($userId){
                        $q->join('collections_permissions as cp', function ($join) {
                            $join->on('cp.collection_id','=','collections.id');
                        });
                                                
                        $q->select('collections.id','collections.category','collections.brand_id','title','cp.name as display_name','cp.price','cp.collection_id');
                        $q->where('cp.user_id',$userId)->where('cp.status','active');
                       
                    }]);
               }])->select('id','title','vision_plan_id')->where('vision_plan_id',request()->vision_plan_id)->get();
        
        return $this->sendResponse($data, 'Collections');
    }
}
