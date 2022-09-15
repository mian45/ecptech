<?php
use App\Http\Controllers\Api\ProductController;
Route::post('hot-selling-products', [ProductController::class, 'hotSelling']);