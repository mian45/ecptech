<?php

use App\Http\Controllers\Api\SettingController;


Route::get('get-lense-features-brands', [SettingController::class, 'getLenseFeaturesBrands']);