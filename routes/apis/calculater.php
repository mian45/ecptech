<?php

use App\Http\Controllers\Api\InvoiceCalculaterController;


Route::get('calculater-data', [InvoiceCalculaterController::class, 'calculaterData']);
Route::post('store-csv-data', [InvoiceCalculaterController::class, 'storeCSVData']);

Route::post('store-addon-csv-data', [InvoiceCalculaterController::class, 'storeAddonCSVData']);

Route::post('store-code-csv-data', [InvoiceCalculaterController::class, 'storeCodeCSVData']);

Route::post('store-materials-csv-data', [InvoiceCalculaterController::class, 'storeLenseMaterialCSVData']);

Route::post('get-lenses-price', [InvoiceCalculaterController::class, 'getLensePrices']);

Route::post('get-collections', [InvoiceCalculaterController::class, 'getCollections']);

