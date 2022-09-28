<?php 
use App\Http\Controllers\Api\PrescriptionController;

Route::get('prescriptions', [PrescriptionController::class, 'prescriptions']);
Route::get('get-eye-prescriptions', [PrescriptionController::class, 'getEyePrescriptions']);
Route::post('eye-prescriptions', [PrescriptionController::class, 'eyePrescriptions']);
Route::post('eye-prescriptions-calculator', [PrescriptionController::class, 'eyePrescriptionsCalculator']);          