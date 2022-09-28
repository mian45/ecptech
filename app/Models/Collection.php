<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    use HasFactory;

    public function brand(){
        return $this->belongsTo(Brand::class);
    }

    public function lenses(){
        return $this->hasMany(Lense::class);
    }
}
