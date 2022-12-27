<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LensMaterial extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function lenses(){
        return $this->hasMany(Lense::class);
    }

    public function prices(){
        return $this->hasMany(Code::class,'lense_material_id');
    }
}
