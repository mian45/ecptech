<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class VisionPlanPermission extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'vision_plan_id',
        'status'
    ];

    public function VisionPlan()
    {
        return $this->belongsTo(VisionPlan::class,'vision_plan_id');
    }
}
