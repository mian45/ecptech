<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LenseType extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    
    public function visionplan(){
        return $this->belongsTo(VisionPlan::class);
    }

    public function brands(){
        return $this->hasMany(Brand::class,'lens_type_id');
    }
}
