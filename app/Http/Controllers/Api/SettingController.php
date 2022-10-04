<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LensMaterial;
use App\Models\LenseType;
use App\Models\UserLenseMaterialSetting;
use Validator;
use Illuminate\Support\Facades\DB;


class SettingController extends Controller
{

    public function getLenseFeaturesBrands(Request $request){
        $data = LenseType::with(['brands'=>function($q){
            $q->select('id','lens_type_id','title');
            $q->with(['collections'=>function($q){
                $q->select('id','brand_id','title');
            }]);
       }])->select('id','title')->get();

       return $this->sendResponse($data, 'Lense data');
    }
    public function getLenseMaterial(Request $request){
        $lense_materials = LensMaterial::leftJoin('user_lense_material_settings as setting', function($join){
                                $join->on('lens_materials.id', '=', 'setting.lens_material_id')
                                ->where('setting.user_id',  auth()->user()->id);            
                            })
                            ->select('lens_materials.id','lens_material_title',DB::raw('IFNULL(status,"inactive") as status'),'price')
                            ->orderBy('lens_materials.id')
                            ->get();

        return $this->sendResponse($lense_materials, 'Lense Materials');

    }

    public function addLenseMaterial(Request $request){
        
        $validator = Validator::make($request->all(), [
            'lens_material_id' => 'required|exists:lens_materials,id',
            'status' => 'sometimes|in:active,inactive',
            'price' => 'sometimes|numeric'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $setting = UserLenseMaterialSetting::firstOrNew([
            'user_id' => auth()->user()->id,
            'lens_material_id' => $request->lens_material_id
        ]);
        
        if($setting){
            if ($request->has('status')) {
                $setting->status = $request->status;
            }
            
            if ($request->has('price')) {
                $setting->price = $request->price;
            }

            $setting->save();
            return $this->sendResponse([], 'Lense material status Updated');
        }
        
        return $this->sendError('Something went wrong');

    }
}
