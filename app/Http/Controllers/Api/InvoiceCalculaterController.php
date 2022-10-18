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


class InvoiceCalculaterController extends Controller
{
    public function calculaterData (Request $request){

        $data['shipping'] = "";
        $data['tax'] = "";
        $data['discount'] = "";

        $shipping = Shipping::where('user_id',auth()->user()->id)->orderBy('created_at', 'desc')->first();
        if($shipping){
            $data['shipping'] = $shipping->value;
        }

        $discount = Discount::select('id','user_id','name','value','status')->where('user_id',auth()->user()->id)->orderBy('created_at', 'desc')->get();
        if($discount){
            $data['discount'] = $discount;
        }

        $tax = Tax::where('user_id',auth()->user()->id)->orderBy('created_at', 'desc')->first();
        if($tax){
            $data['tax'] = $tax->value;
        }

        $data['addons'] = AddonType::with(['addons' => function($q){
            $q->leftjoin('user_addon_settings as setting','setting.addon_id','=','addons.id');
            $q->select('addons.id','addons.addon_type_id','addons.title','setting.status','setting.display_name','setting.price','setting.addon_id');
            $q->where('setting.user_id',auth()->user()->id)->where('setting.status','active');
        }])->select('id','title')->get();
        
        
        
        
        $data['questions'] = VisionPlan::with(['question_permissions' => function($q){
                $q->join('questions as q','q.id','=','question_permissions.question_id');
                $q->select('q.id as q_id','question_permissions.vision_plan_id','q.title as question',
                    DB::raw('IF(question_permissions.status, "true", "false") as visibility'),
                    DB::raw('IF(question_permissions.optional, "true", "false") as optional')
                );
                $q->where('question_permissions.user_id',auth()->user()->id);
        }])->join('vision_plan_permissions as vsp','vsp.vision_plan_id','=','vision_plans.id')
            ->where('vsp.user_id',auth()->user()->id)
            ->select('vision_plans.id','vision_plans.title')->get();


       $data['lens_types'] = LenseType::with(['brands'=>function($q){
            $q->join('brand_permissions as bp','bp.brand_id','=','brands.id');
            $q->select('brands.id','lens_type_id','title');
            $q->where('bp.user_id',auth()->user()->id)->where('bp.status','active');
            $q->with(['collections'=>function($q){
                $q->join('collections_permissions as cp','cp.collection_id','=','collections.id');
                $q->select('collections.id','collections.brand_id','title','cp.name as display_name','cp.price');
                $q->where('cp.user_id',auth()->user()->id)->where('cp.status','active');
            }]);
       }])->selectRaw("MIN(id) AS id,title,MIN(vision_plan_id) AS vision_plan_id")->groupby('title')->get();
       


       $data['lens_material'] = LensMaterial::leftjoin('user_lense_material_settings as setting','setting.lens_material_id','=','lens_materials.id')
                                            ->select('lens_materials.id','lens_materials.lens_material_title','setting.price as retail_price')    
                                            ->where('setting.user_id',auth()->user()->id)
                                            ->where('setting.status','active')
                                            ->get();

        return $this->sendResponse($data, 'Calculater Data');
    }

    public function storeCSVData(Request $request){

        $validator = Validator::make($request->all(), [
            'csv' => 'required|mimes:csv,txt'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
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
                                $lense = Lense::updateOrCreate(
                                    ['title'=> $data[5], 'collection_id'=>$collection->id, "lens_material_id"=>$material_id]
                                );
                            }

                            if(!empty($data[6])){
                                
                                $code_id = null;
                                if(!empty($data[7])){
                                    
                                    $code = Code::where('name',$data[7])->first();
                                    if($code){
                                        $code_id = $code->id;
                                    }
                                }

                                $type = null;
                                if(!empty($data[8])){
                                    $type = strtolower($data[8]);
                                }

                                $characteristic = Characteristic::updateOrCreate(
                                    ['title'=> $data[6], 'lense_id'=>$lense->id, "code_id"=>$code_id, "type"=>$type]
                                );
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
            return $this->sendError('Validation Error.', $validator->errors());
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



    private function clear_encoding_str($value)
    {
        if (is_array($value)) {
            $clean = [];
            foreach ($value as $key => $val) {
                $clean[$key] = mb_convert_encoding($val, 'UTF-8', 'UTF-8');
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
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $data['lenses_price'] = Collection::where('id',$request->collection_id)->with(['lenses'=>function($q){

                        $q->leftjoin('lens_materials', 'lenses.lens_material_id', '=', 'lens_materials.id');
                        $q->where('lenses.lens_material_id',request()->lense_material_id);
                        $q->select('lenses.id','collection_id','lens_material_id','title','lens_materials.lens_material_title');
                        $q->with(['characteristics' => function($q){
                            $q->leftjoin('codes', 'characteristics.code_id', '=', 'codes.id');
                            $q->select('characteristics.id','characteristics.title','characteristics.lense_id','characteristics.type','characteristics.code_id','codes.name','codes.price');
                        }]);
                    }])->select('id','title')->get();
           
            
        return $this->sendResponse($data, 'Calculater Data');

    }
}
