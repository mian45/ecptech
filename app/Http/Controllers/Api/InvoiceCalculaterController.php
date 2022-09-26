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


class InvoiceCalculaterController extends Controller
{
    public function calculaterData (Request $request){

        //It will be dynamic when users setting/permission work is done in next sprint
        $data['questions'] = array(
            "visionPlan"=>["visibility"=>true, "optional"=>true],
            "frameBenefit"=>["visibility"=>true, "optional"=>true],
            "lensBenefit"=>["visibility"=>true, "optional"=>true],
            "materialCopay"=>["visibility"=>true, "optional"=>true],
            "frameOrder"=>["visibility"=>true, "optional"=>true],
            "copayDollarAmount"=>["visibility"=>true, "optional"=>true],
            "lensType"=>["visibility"=>true, "optional"=>true],
            "lensMaterial"=>["visibility"=>true, "optional"=>true],
            "photochromics"=>["visibility"=>true, "optional"=>true],
            "sunglassLens"=>["visibility"=>true, "optional"=>true],
            "antireflective"=>["visibility"=>true, "optional"=>true],
            "protectionPlan"=>["visibility"=>true, "optional"=>true],
            "shipping"=>["visibility"=>true, "optional"=>true],
        );

        //It will be dynamic when users etting/permission work is done in next sprint
       
       $lensetypes = LenseType::get();
       foreach($lensetypes as $lensetype){
        $brands = Brand::where('lens_type_id',$lensetype->id)->get();
        foreach($brands as $brand){
            $collections = Collection::where('brand_id',$brand->id)->get();
            $data['lens_types'][$lensetype->title] = $collections; 
        }
       }

       $data['lens_material'] = LensMaterial::get();


        
        $vision_plans = VisionPlan::get();

        foreach($vision_plans as $vision_plan){
            $lensetypes = LenseType::where('vision_plan_id',$vision_plan->id)->get();
           
            foreach($lensetypes as $lensetype){
                $brands = Brand::where('lens_type_id',$lensetype->id)->get();
                foreach($brands as $brand){
                    $collections = Collection::where('brand_id',$brand->id)->get();
                    foreach($collections as $collection){
                        $lenses = Lense::where('collection_id',$collection->id)->get();
                        foreach($lenses as $lense ){
                            $characteristics = Characteristic::where('lense_id',$lense->id)->get();
                            foreach($characteristics as $characteristic){

                                $code = Code::where('id',$characteristic->code_id)->first();
                                $data['sheet_data'][$vision_plan->title][$lensetype->title][$brand->title][$collection->title][$lense->title][$characteristic->title] = 
                                array("type"=>$characteristic->type, "code"=>$code->name,"price"=>$code->price);
                                        
                            }
                        }
                    }
                }
                
            }
            
        }
        return $this->sendResponse($data, 'Calculater Data');
    }
}
