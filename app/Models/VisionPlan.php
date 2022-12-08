<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisionPlan extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function lensetypes(){
        return $this->hasMany(LenseType::class);
    }

    public function question_permissions(){
        return $this->hasMany(QuestionPermission::class);
    }

    public function addon_types(){
        return $this->hasMany(AddonType::class);
    }


}
