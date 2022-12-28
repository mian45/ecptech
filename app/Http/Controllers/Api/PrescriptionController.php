<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Prescription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Validation\ValidationException;

class PrescriptionController extends Controller
{
    public function prescriptions(Request $request){
        $validator = Validator::make($request->all(), [
            'plan' => 'required|in:vsp,davis,eyemed,spectra,vba',
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }
        $user = auth()->user();
        $user_id=$user->id;
        if($user->role_id===3){
          $user_id=  $user->client_id;
        }
        $eye_prescription = Prescription::select('id','name','sphere_from','sphere_to','plan','user_id','created_at','updated_at')->where('plan',$request->plan)->where('user_id',$user_id)->get();
        $data = array();
        foreach($eye_prescription as $row){

            if(isset($data[$row->name]) == false){
                $data[$row->name] = array();
            }
            array_push($data[$row->name],$row);
        }
        return $this->sendResponse($data, 'Eye prescription data get successfully');
    }
    public function eyePrescriptions(Request $request){

        $validator = Validator::make($request->all(), [
            'plan' => 'required|in:vsp,davis,eyemed,spectra,vba',
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }
        $prescriptions = $request->eye_prescriptions;
        $user = auth()->user();
        $user_id=$user->id;
        if($user->role_id===3){
          $user_id=  $user->client_id;
        }  
   
        
        Prescription::where('user_id', $user_id)->where('plan',$request->plan)->delete();
            foreach($prescriptions as $data){      
                foreach($data as $row){
                    $eyePrescription = new Prescription;
                    $eyePrescription->plan = $request->plan;
                    $eyePrescription->name = $row['name'];
                    $eyePrescription->sphere_from = $row['sphere_from'];
                    $eyePrescription->sphere_to = $row['sphere_to'];
                    $eyePrescription->user_id = $user_id;
                    $eyePrescription->save();
                }                        
            }
            $eye_prescription = Prescription::select('id','name','sphere_from','sphere_to','plan','user_id','created_at','updated_at')->where('plan',$request->plan)->where('user_id',$user_id)->get();
            $data = array();
            foreach($eye_prescription as $row){
    
                if(isset($data[$row->name]) == false){
                    $data[$row->name] = array();
                }
                array_push($data[$row->name],$row);
            }
            return $this->sendResponse($data, 'Eye prescription data update successfully');

    }

    public function eyePrescriptionsCalculator(Request $request){
        $validator = Validator::make($request->all(), [
            'right_eye_sphere' => 'required',
            'right_eye_cylinder' => 'required',
            'left_eye_sphere' => 'required',
            'left_eye_cylinder' => 'required',
            'plan' => 'required|in:vsp,davis,eyemed,spectra,vba',
        ]);
        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }
        $user = auth()->user();
        $user_id=$user->id;
        if($user->role_id===3){
          $user_id=  $user->client_id;
        }

        $resultRight = $request->right_eye_sphere + $request->right_eye_cylinder;

        $resultRight = ($request->right_eye_sphere >= $resultRight)? $request->right_eye_sphere : $resultRight;

        $right_eye_material = Prescription::where(function ($query) use ($resultRight,$request)  {
            $query->where('sphere_from', '<=', $resultRight)
                  ->where('sphere_to', '>=', $resultRight)
                  ->where('plan',$request->plan);
        })->orWhere(function ($query) use ($resultRight,$request){
            $query->where('sphere_from', '>=', $resultRight)
                  ->where('sphere_to', '<=', $resultRight)
                  ->where('plan',$request->plan);
        })->where('plan',$request->plan)->where('user_id', $user_id)->first();

        $resultLeft = $request->left_eye_sphere + $request->left_eye_cylinder;
        $resultLeft = ($request->left_eye_sphere >= $resultLeft)? $request->left_eye_sphere : $resultLeft;
        $left_eye_material = Prescription::where(function ($query) use ($resultLeft,$request) {
            $query->where('sphere_from', '<=', $resultLeft)
                  ->where('sphere_to', '>=', $resultLeft)
                  ->where('plan',$request->plan);
        })->orWhere(function ($query) use ($resultLeft,$request){
            $query->where('sphere_from', '>=', $resultLeft)
                  ->where('sphere_to', '<=', $resultLeft)
                  ->where('plan',$request->plan);
        })->where('plan',$request->plan)->where('user_id', $user_id)->first();

        $meterial_name = '';
        if(isset($right_eye_material) && isset($left_eye_material)){
           if($right_eye_material->id < $left_eye_material->id){
             $meterial_name = $right_eye_material->name;
           }else{
            $meterial_name = $left_eye_material->name;
           }
        }elseif(isset($right_eye_material)){
            $meterial_name = $right_eye_material->name;
        }elseif($left_eye_material){
            $meterial_name = $left_eye_material->name;
        }
        $success = [
            'use_material' => [
                'right_eye_material' => [
                    'used_meterial' => $meterial_name,
                    'sphere' => $request->right_eye_sphere,
                    'cylinder' => $request->right_eye_cylinder
                    ], 
                'left_eye_material' => [
                    'used_meterial' => $meterial_name,
                    'sphere' => $request->left_eye_sphere,
                    'cylinder' => $request->left_eye_cylinder
                    ]
                ]
        ];
        return $this->sendResponse($success, 'Eye prescription calculater');   
    }

    public function getEyePrescriptions(Request $request){
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $user_id = $request->user_id;
        $eye_prescription = Prescription::where('user_id',$user_id)->get();
        $sphere_from = [];
        $sphere_to = [];
        $cylinder_from = [];
        $cylinder_to = [];
        foreach ($eye_prescription as $ep) {
            array_push($sphere_from, $ep->sphere_from);
            array_push($sphere_to, $ep->sphere_to);
            array_push($cylinder_from, $ep->cylinder_from);
            array_push($cylinder_to, $ep->cylinder_to);
        }
        $eye_prescription = [
            'right_eye_sph' => $sphere_from,            
            'right_eye_cyl' => $cylinder_from,
            'left_eye_sph'   => $sphere_to,
            'left_eye_cyl'   => $cylinder_to
        ];
        return $this->sendResponse($eye_prescription, 'Eye prescription data get successfully');   
    }
}