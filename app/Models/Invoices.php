<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoices extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable = [
        'name',
        'customer_id',
        'user_id',
        'product_id',
        'staff_id',
        'amount',
        'status',
        'payment_mode',
        'created_at',
        'updated_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
    public function customer()
    {
        return $this->belongsTo(Customer::class,'customer_id');
    }
    public function staff() 
    {
        return $this->belongsTo(Staff::class,'staff_id');
    }

}
