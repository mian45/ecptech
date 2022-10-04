<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LenseType;
use App\Models\Brand;
use App\Models\Collection;
class SettingController extends Controller
{
    public function getLenseFeaturesBrands(Request $request){
       

          $data = LenseType::with(['brands'=>function($q){
            $q->select('id','title','lens_type_id');
            $q->with(['collections'=>function($q){
                $q->select('id','title','brand_id');
            }]);
           }])->select('id','title')->get();
        

           return $this->sendResponse($data, 'Lense Type Data');
          

           
      }
}
