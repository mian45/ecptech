<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Prescription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class PrescriptionController extends Controller
{
    public function eyePrescriptions(Request $request){
        $prescriptions = $request->eye_prescriptions;
        $user_id = $request->user_id;
        if($prescriptions){
            foreach($prescriptions as $ep){                
                $eyePrescription =  Prescription::find($ep['id']);
                if($eyePrescription){
                    $eyePrescription->sphere_from = $ep['sphere_from'];
                    $eyePrescription->sphere_to = $ep['sphere_to'];
                    $eyePrescription->cylinder_from = $ep['cylinder_from'];
                    $eyePrescription->cylinder_to = $ep['cylinder_to'];
                    $eyePrescription->save();
                }
            }
            $eye_prescription = Prescription::where('user_id',$user_id)->get();
            return $this->sendResponse($eye_prescription, 'Eye Prescription Updated successfully');
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }               
    }

    public function eyePrescriptionsCalculator(Request $request){
        $validator = Validator::make($request->all(), [
            'right_eye_sphere' => 'required',
            'right_eye_cylinder' => 'required',
            'left_eye_sphere' => 'required',
            'left_eye_cylinder' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $right_eye_material = Prescription::where('sphere_from', '<=', $request->right_eye_sphere)
        ->where('sphere_to', '>=', $request->right_eye_sphere)
        ->where('cylinder_from', '<=', $request->right_eye_cylinder)
        ->where('cylinder_to', '>=', $request->right_eye_cylinder)->first();

        $left_eye_material = Prescription::where('sphere_from', '<=', $request->left_eye_sphere)
        ->where('sphere_to', '>=', $request->left_eye_sphere)
        ->where('cylinder_from', '<=', $request->left_eye_cylinder)
        ->where('cylinder_to', '>=', $request->left_eye_cylinder)->first();
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
        return $this->sendResponse($success, 'Eye Prescription Updated successfully');   
    }

    public function getEyePrescriptions(Request $request){
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
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
        return $this->sendResponse($eye_prescription, 'Eye Prescription data');   
    }
}