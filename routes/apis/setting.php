<?php

use App\Http\Controllers\Api\SettingController;


Route::get('get-lense-features-brands', [SettingController::class, 'getLenseFeaturesBrands']);
Route::post('update-lense-setting', [SettingController::class, 'updateLenseSettings']);
Route::get('lense-material-settings', [SettingController::class, 'getLenseMaterial']);
Route::post('add-lense-material-setting', [SettingController::class, 'addLenseMaterial']);

Route::post('add-price-dispaly-name-in-brands', [SettingController::class, 'addPriceDispalyNameInBrands']);
Route::get('addon-settings', [SettingController::class, 'getAddons']);
Route::post('add-addon-setting', [SettingController::class, 'addAddon']);
