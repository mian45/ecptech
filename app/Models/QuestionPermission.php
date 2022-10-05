<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionPermission extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'vision_plan_id',
        'question_id',
        'optional',
        'status'
    ];
    public function Question()
    {
        return $this->belongsTo(Question::class,'question_id');
    }
}
