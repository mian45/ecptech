<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LenseType extends Model
{
    use HasFactory;
    
    public function visionplan(){
        return $this->belongsTo(VisionPlan::class);
    }
}
