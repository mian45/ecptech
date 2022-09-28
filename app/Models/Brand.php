<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function lensetype(){
        return $this->belongsTo(LenseType::class);
    }

    public function collections(){
        return $this->hasMany(Collection::class);
    }

}
