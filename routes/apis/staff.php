<?php

use App\Http\Controllers\Api\StaffController;




Route::post('getStaff', [StaffController::class, 'getStaff']);
Route::post('addStaff', [StaffController::class, 'addStaff']);
Route::post('editStaff', [StaffController::class, 'editStaff']);
Route::post('delete-staff', [StaffController::class, 'deleteStaff']);
