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
use App\Models\AddonType;
use App\Models\AddOn;
use App\Models\AddonExtra;
use Validator;


class InvoiceCalculaterController extends Controller
{
    public function calculaterData (Request $request){

        $data['shipping'] = "";
        $data['tax'] = "";

        $shipping = Shipping::where('user_id',auth()->user()->id)->orderBy('created_at', 'desc')->first();
        if($shipping){
            $data['shipping'] = $shipping->value;
        }

        $tax = Tax::where('user_id',auth()->user()->id)->orderBy('created_at', 'desc')->first();
        if($tax){
            $data['tax'] = $tax->value;
        }

        //It will be dynamic when users setting/permission work is done in next sprint
        
        $data['questions']['VSP Signature'] = array(
            "visionPlan"=>["visibility"=>true, "optional"=>true],
            "frameBenefit"=>["visibility"=>true, "optional"=>true],
            "lensBenefit"=>["visibility"=>true, "optional"=>false],
            "materialCopay"=>["visibility"=>true, "optional"=>true],
            "frameOrder"=>["visibility"=>true, "optional"=>false],
            "copayDollarAmount"=>["visibility"=>true, "optional"=>true],
            "lensType"=>["visibility"=>true, "optional"=>true],
            "lensMaterial"=>["visibility"=>true, "optional"=>true],
            "photochromics"=>["visibility"=>true, "optional"=>false],
            "sunglassLens"=>["visibility"=>true, "optional"=>true],
            "antireflective"=>["visibility"=>true, "optional"=>true],
            "protectionPlan"=>["visibility"=>true, "optional"=>true],
            "shipping"=>["visibility"=>true, "optional"=>true],
        );
        //

        //It will be dynamic according to user permission/setting work in next sprint
       
       $data['lens_types'] = LenseType::with(['brands'=>function($q){
            $q->select('id','lens_type_id','title');
            $q->with(['collections'=>function($q){
                $q->select('id','brand_id','title');
            }]);
       }])->select('id','vision_plan_id','title')->get();

       $data['lens_material'] = LensMaterial::get();


       
        
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
