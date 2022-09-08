<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Prescription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class PrescriptionController extends Controller
{
    public function eye_prescriptions(Request $request){
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

    public function eye_prescriptions_calculator(Request $request){
        $validator = Validator::make($request->all(), [
            'right_eye_sphere' => 'required',
            'right_eye_cylinder' => 'required',
            'left_eye_sphere' => 'required',
            'left_eye_cylinder' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $eye_prescription = Prescription::where('sphere_from', '<=', $request->right_eye_sphere)
        ->where('sphere_to', '>=', $request->right_eye_sphere)->first();
        return $this->sendResponse($eye_prescription, 'Eye Prescription Updated successfully');   
    }
}