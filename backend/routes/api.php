<?php

use App\Http\Controllers\MatchingServiceController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/service', [ServiceController::class, 'create']);
Route::get('/services', [ServiceController::class, 'services']);
Route::put('/service/{id}', [ServiceController::class, 'updateService']);
Route::delete('/service/{id}', [ServiceController::class, 'deleteService']);

Route::post('/user-services', [UserServiceController::class, 'store']);
Route::get('/user-services', [UserServiceController::class, 'index']);

Route::get('selected-services', [UserServiceController::class, 'getSelectedServices']);
Route::get('unselected-services', [UserServiceController::class, 'getUnselectedServices']);

Route::apiResource('users', UserController::class);
Route::get('matching-services', [UserServiceController::class, 'getMatchingServices']);


Route::get('/user/{id}/match-service', [MatchingServiceController::class, 'matchService']);
