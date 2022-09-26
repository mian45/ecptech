<?php

use App\Http\Controllers\Api\InvoiceCalculaterController;


Route::get('calculater-data', [InvoiceCalculaterController::class, 'calculaterData']);