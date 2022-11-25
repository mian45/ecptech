<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Products;
use App\Models\Transactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{
    public function hotSelling(Request $request){
        $validator = Validator::make($request->all(), [
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);
        
        if ($validator->fails()) {
            throw (new ValidationException($validator));
        }

        $user_id = $request->user_id;
        $row = 0;
        $hot_selling_products = DB::table('transactions')
        ->select('products.name', DB::raw('count(product_id) as sale_count'))
        ->join('products', 'transactions.product_id', '=', 'products.id')
        ->where('transactions.user_id', $user_id)
        ->groupBy('transactions.product_id')
        ->limit(3)
        ->orderBy('sale_count', 'desc')
        ->get()->each(function ($row, $index) {
            $row->no = $index + 1;
        });
        return $this->sendResponse($hot_selling_products, 'Hot selling products get successfully');
    }
}