<?php

use App\Http\Controllers\Api\SettingController;


Route::get('get-lense-features-brands', [SettingController::class, 'getLenseFeaturesBrands']);
Route::get('lense-material-settings', [SettingController::class, 'getLenseMaterial']);
Route::post('add-lense-material-setting', [SettingController::class, 'addLenseMaterial']);