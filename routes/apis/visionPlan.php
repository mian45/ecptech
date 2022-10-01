<?php
use App\Http\Controllers\Api\VisionPlanController;


Route::get('get-client-vision-plans', [VisionPlanController::class, 'getClientVisionPlans']);
Route::post('update-user-vision-plan-permission', [VisionPlanController::class, 'updateVisionPlanPermission']);

Route::get('get-client-plan-questions', [VisionPlanController::class, 'getClientPlanQuestions']);

Route::post('update-user-plan-question-permission', [VisionPlanController::class, 'updatePlanQuestionPermission']);