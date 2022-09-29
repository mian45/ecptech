<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Invoice extends Model
{
    use HasFactory;

    public function customer()
    {
      return $this->hasOne(Customer::class, 'customer_id');
    }
}
