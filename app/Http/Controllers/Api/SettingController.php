<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LensMaterial;
use App\Models\AddOn;
use App\Models\AddonType;
use App\Models\UserLenseMaterialSetting;
use App\Models\UserAddOnSetting;
use Validator;
use Illuminate\Support\Facades\DB;


class SettingController extends Controller
{

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

    public function getAddons(Request $request){
        $addons = AddonType::with(['addons'=>function($q){
           $q->leftJoin('user_addon_settings as setting', function($join){
            $join->on('addons.id', '=', 'setting.addon_id')
            ->where('setting.user_id',  auth()->user()->id);            
            });
            $q->select('addons.id','addons.title','addons.addon_type_id',DB::raw('IFNULL(status,"inactive") as status'),'name as display_name','price');
            $q->with(['addon_extra' => function($q){
                $q->leftJoin('user_addon_settings as setting', function($join){
                    $join->on('addon_extra.id', '=', 'setting.addon_extra_id')
                    ->where('setting.user_id',  auth()->user()->id);            
                    });
                $q->select('addon_extra.id','addon_extra.title','addon_extra.addon_id',DB::raw('IFNULL(status,"inactive") as status'),'name as display_name','price');

            }]);
        }])->select('id','title')->get();


        
        
        
        return $this->sendResponse($addons, 'Add-Ons');

    }

    public function addAddon(Request $request){
        
        $validator = Validator::make($request->all(), [
            'addon_id' => 'required_without:addon_extra_id|exists:addons,id',
            'addon_extra_id' => 'required_without:addon_id|exists:addon_extra,id',
            'status' => 'sometimes|in:active,inactive',
            'name' => 'sometimes|required',
            'price' => 'sometimes|numeric'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        if ($request->has('addon_id')) {
            $data = array(
                'user_id' => auth()->user()->id,
                'addon_id' => $request->addon_id
            );
        }

        if ($request->has('addon_extra_id')) {
            $data = array(
                'user_id' => auth()->user()->id,
                'addon_extra_id' => $request->addon_extra_id
            );
        }

        $setting = UserAddOnSetting::firstOrNew($data);
        
        if($setting){
            if ($request->has('status')) {
                $setting->status = $request->status;
            }
            
            if ($request->has('price')) {
                $setting->price = $request->price;
            }

            if ($request->has('name')) {
                $setting->name = $request->name;
            }

            $setting->save();
            return $this->sendResponse([], 'AddOn status Updated');
        }
        
        return $this->sendError('Something went wrong');

    }

}
