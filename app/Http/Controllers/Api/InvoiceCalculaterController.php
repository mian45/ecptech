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
        $data['questions']['VSP Signature'] = array(
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
        //

        //It will be dynamic according to user permission/setting work in next sprint
       
       $data['lens_types'] = LenseType::with(['brands'=>function($q){
        $q->with('collections');
       }])->get();

       $data['lens_material'] = LensMaterial::get();


       $data['sheet_data'] = VisionPlan::with(['lensetypes'=>function($q){
        $q->with(['brands'=>function($q){
            $q->with(['collections'=>function($q){
                $q->with(['lenses'=>function($q){
                    $q->join('lens_materials', 'lenses.lens_material_id', '=', 'lens_materials.id');
                    $q->with(['characteristics' => function($q){
                        $q->join('codes', 'characteristics.code_id', '=', 'codes.id');
                    }]);
                }]);
            }]);
        }]);
       }])->get();
       
        
        return $this->sendResponse($data, 'Calculater Data');
    }
}
