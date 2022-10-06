<?php

use App\Http\Controllers\Api\SettingController;


Route::get('lense-material-settings', [SettingController::class, 'getLenseMaterial']);
Route::post('add-lense-material-setting', [SettingController::class, 'addLenseMaterial']);

Route::get('addon-settings', [SettingController::class, 'getAddons']);
Route::post('add-addon-setting', [SettingController::class, 'addAddon']);
