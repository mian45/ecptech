<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transactions extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable = [
        'user_id',
        'invoice_id',
        'amount',
        'status',
        'customer_first_name',
        'customer_last_name',
        'customer_phone',
        'customer_email',
        'customer_address',
        'customer_dob',
        'created_at',
        'updated_at'
    ];
}
