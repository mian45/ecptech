<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LensMaterial;
use App\Models\LenseType;
use App\Models\UserLenseMaterialSetting;
use App\Models\BrandPermission;
use App\Models\CollectionPermission;
use App\Models\AddOn;
use App\Models\AddonType;
use App\Models\UserAddOnSetting;
use Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use App\Models\Brand;
use App\Models\Collection;


class SettingController extends Controller
{

    public function getLenseFeaturesBrands(Request $request){
        $validator = Validator::make($request->all(), [
            'userId' => 'required'
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
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
        }])->selectRaw("MIN(id) AS id,title")->groupby('title')->get();
 

       return $this->sendResponse($data, 'Lense data get successfully');
    }
    
    public function updateLenseSettings(Request $request){

        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'data' => 'required'
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }
        $user_id = $request->user_id;
        $data = $request->data;
        if(auth()->user()->id != $user_id){
            return $this->sendError('invalid user id!');
        }
        $i = 0;
        foreach($data as $lense_type){
            
            $lense_type_id = $lense_type['id'];
            $lense_type_title = $lense_type['title'];

            $lense_types = LenseType::where('title',$lense_type_title)->get();

            foreach($lense_type['brands'] as $brand){
                $brand_id = $brand['id'];
                $brand_title = $brand['title'];

                foreach($lense_types as $lense){
                    $brands = Brand::where('lens_type_id',$lense->id)->get();
                    
                    foreach($brands as $b){
                        

                        if($b->title == $brand_title){
                            

                            $brandPermission = BrandPermission::updateOrCreate(
                                ['user_id' => $user_id, 'lense_type_id' => $lense->id,'brand_id'=>$b->id],
                                ['status' => $brand['status'],'lense_type_title' => $lense_type_title,'brand_title'=>$brand_title]
                            );

                            foreach($brand['collections'] as $collection){
                    
                                $collection_id = $collection['id'];
                                $collection_title = $collection['title'];
                                $name = $collection['display_name'];
                                $price = $collection['custom_price'];
                                $status = $collection['status'];

                                $collections = Collection::where('brand_id',$b->id)->get();
                                
                                foreach($collections as $c){
                                        
                                    
                                    if($c->title ==  $collection_title){
                                       
                                        $collectionPermission = CollectionPermission::updateOrCreate(
                                            ['user_id' => $user_id, 'brand_id' => $b->id, 'collection_id' => $c->id],
                                            ['price' => $price,'name' => $name,'status' => $status, 'brand_title' => $brand_title, 'collection_title' => $collection_title],
                                        );
                                    }
                                }

                                
                            }



                        }

                    }
                }

                
            }

            $permission[$i] = $lense_type;
            $i++;

            
        }

        return $this->sendResponse($permission, 'Lense setting updated successfully');
        
    }
    public function getLenseMaterial(Request $request){
        $lense_materials = LensMaterial::leftJoin('user_lense_material_settings as setting', function($join){
                                $join->on('lens_materials.id', '=', 'setting.lens_material_id')
                                ->where('setting.user_id',  auth()->user()->id);            
                            })
                            ->select('lens_materials.id','lens_material_title',DB::raw('IFNULL(status,"inactive") as status'),'price','display_name')
                            ->orderBy('lens_materials.id')
                            ->get();

        return $this->sendResponse($lense_materials, 'Lense materials get successfully');

    }

    public function addLenseMaterial(Request $request){
        
        $validator = Validator::make($request->all(), [
            'data' => 'required'
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $data = $request->data;
    
        $i = 0;
        foreach($data as $lense_material){

            $lense_material_id = $lense_material['id'];

            $setting = UserLenseMaterialSetting::updateOrCreate(
                ['user_id' => auth()->user()->id, 'lens_material_id' => $lense_material_id],
                ['status' => $lense_material['status'], 'price'=>$lense_material['price'], 'display_name'=>$lense_material['display_name']]
            );

            $permission[$i] = $lense_material;
            $i++;
            
        }   
      
        return $this->sendResponse($permission, 'Lense material updated successfully');

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
                    throw (new ValidationException($validator));
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
            $q->select('addons.id','addons.title','addons.addon_type_id',DB::raw('IFNULL(status,"inactive") as status'),'display_name','price');
        }])->select('id','title')->get();
        
        return $this->sendResponse($addons, 'Add-Ons');
    }

    public function addAddon(Request $request){
        
        $validator = Validator::make($request->all(), [
            'data' => 'required'
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $data = $request->data;

        $i = 0;
        foreach($data as $addon_type){
            
            
            foreach($addon_type['addons'] as $addon){

                $setting = UserAddOnSetting::updateOrCreate(
                    ['user_id' => auth()->user()->id, 'addon_id' => $addon['id']],
                    ['status' => $addon['status'], 'price'=>$addon['price'], 'display_name'=>$addon['display_name']]
                );
            }

            $permission[$i] = $addon_type;
            $i++;
        }

        return $this->sendResponse($permission, 'Addon status updated successfully');

    }

}
