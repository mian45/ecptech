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
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $user_id = $request->user_id;
        $eye_prescription = Prescription::where('user_id',$user_id)->get();
        return $this->sendResponse($eye_prescription, 'Eye prescription data get successfully');
    }
    public function eyePrescriptions(Request $request){
        $prescriptions = $request->eye_prescriptions;
        $user_id = $request->user_id;  
        if($prescriptions){
            foreach($prescriptions as $ep){
                $id = (isset($ep['id']) ? $ep['id'] : 0);
                $prescriptionExist = Prescription::where('id', $id)->where('user_id', $user_id)->first();                                   
                if(isset($prescriptionExist)){
                    $eyePrescription =  Prescription::find($id);
                    if($eyePrescription){
                        $eyePrescription->name = $ep['name'];
                        $eyePrescription->sphere_from = $ep['sphere_from'];
                        $eyePrescription->sphere_to = $ep['sphere_to'];
                        $eyePrescription->cylinder_from = $ep['cylinder_from'];
                        $eyePrescription->cylinder_to = $ep['cylinder_to'];
                        $eyePrescription->save();
                    }
                } else {
                    $eyePrescriptionsave = new Prescription;
                    $eyePrescriptionsave->name = $ep['name'];
                    $eyePrescriptionsave->sphere_from = $ep['sphere_from'];
                    $eyePrescriptionsave->sphere_to = $ep['sphere_to'];
                    $eyePrescriptionsave->cylinder_from = $ep['cylinder_from'];
                    $eyePrescriptionsave->cylinder_to = $ep['cylinder_to'];
                    $eyePrescriptionsave->user_id = $user_id;
                    $eyePrescriptionsave->save();
                }
                
            }
            $eye_prescription = Prescription::where('user_id',$user_id)->get();
            return $this->sendResponse($eye_prescription, 'Eye prescription updated successfully');
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }               
    }

    public function eyePrescriptionsCalculator(Request $request){
        $validator = Validator::make($request->all(), [
            'right_eye_sphere' => 'required',
            'right_eye_cylinder' => 'required',
            'left_eye_sphere' => 'required',
            'left_eye_cylinder' => 'required',
            'user_id' => 'required'
        ]);

        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }
        $right_eye_material = Prescription::where('sphere_from', '<=', $request->right_eye_sphere)
        ->where('sphere_to', '>=', $request->right_eye_sphere)
        ->where('cylinder_from', '<=', $request->right_eye_cylinder)
        ->where('cylinder_to', '>=', $request->right_eye_cylinder)
        ->where('user_id', $request->user_id)->first();

        $left_eye_material = Prescription::where('sphere_from', '<=', $request->left_eye_sphere)
        ->where('sphere_to', '>=', $request->left_eye_sphere)
        ->where('cylinder_from', '<=', $request->left_eye_cylinder)
        ->where('cylinder_to', '>=', $request->left_eye_cylinder)
        ->where('user_id', $request->user_id)->first();
        $success = [
            'use_material' => [
                'right_eye_material' => [
                    'used_meterial' => isset($right_eye_material->name) ? $right_eye_material->name : '',
                    'sphere' => $request->right_eye_sphere,
                    'cylinder' => $request->right_eye_cylinder
                    ], 
                'left_eye_material' => [
                    'used_meterial' => isset($left_eye_material->name) ? $left_eye_material->name : '',
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