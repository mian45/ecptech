<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LensMaterial;
use App\Models\LenseType;
use App\Models\UserLenseMaterialSetting;
use App\Models\CollectionPermission;
use App\Models\AddOn;
use App\Models\AddonType;
use App\Models\UserAddOnSetting;
use Validator;
use Illuminate\Support\Facades\DB;


class SettingController extends Controller
{

    public function getLenseFeaturesBrands(Request $request){
        $validator = Validator::make($request->all(), [
            'userId' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $user_id = $request->userId;
        if(auth()->user()->id != $user_id){
            return $this->sendError('invalid user id!');
        }
        $data = LenseType::with(['brands'=>function($q){
            $q->leftJoin('brand_permissions as setting', function($join){
                $join->on('setting.brand_id', '=', 'brands.id')
           ->where('setting.user_id',  auth()->user()->id);
            });
            $q->select('brands.id','lens_type_id','title',DB::raw('IFNULL(status,"inactive") as status'));
            $q->with(['collections'=>function($q){
                $q->leftJoin('collections_permissions as collection_setting', function($join){
                    $join->on('collection_setting.collection_id', '=', 'collections.id')
               ->where('collection_setting.user_id',  auth()->user()->id);
                });
                $q->select('collections.id','collections.brand_id','title','collection_setting.name as display_name','collection_setting.price as custom_price',DB::raw('IFNULL(status,"inactive") as status'));
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
    
    public function addPriceDispalyNameInBrands(Request $request){

                $validator = Validator::make($request->all(), [
                    'userId' => 'required',
                    'collectionId' => 'required',
                    'name' => 'required',
                    'price' => 'required',
                    'brandId' => 'required',
                    'status' => 'required|in:active,inactive',
                ]);
        
                if ($validator->fails()) {
                    return $this->sendError('Validation Error.', $validator->errors());
                }
                $user_id = $request->userId;
                $price = $request->price;
                $brand_id = $request->brandId;
                $collection_id = $request->collectionId;
                $name = $request->name;
                $price = $request->price;
                $status = $request->status;
                if(auth()->user()->id != $user_id){
                      return $this->sendError('invalid user id!');
                }
        
                $collectionPermission = CollectionPermission::updateOrCreate(
                    ['user_id' => $user_id, 'brand_id' => $brand_id, 'collection_id' => $collection_id],
                    ['price' => $price,'name' => $name,'status' => $status]
                );
        
           
                return $this->sendResponse($collectionPermission, 'Name and price updated successfully');
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
