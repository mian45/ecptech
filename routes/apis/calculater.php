<?php

use App\Http\Controllers\Api\InvoiceCalculaterController;


Route::get('calculater-data', [InvoiceCalculaterController::class, 'calculaterData']);
Route::post('store-csv-data', [InvoiceCalculaterController::class, 'storeCSVData']);