<?php

use App\Http\Controllers\Api\ConferenceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthenticationController;

Route::middleware("auth:sanctum")->group(function () {
    Route::get("/user", function (Request $request) {
        return $request->user();
    });

    Route::post("/logout", [AuthenticationController::class, "logout"]);
    Route::apiResource("/conferences", ConferenceController::class);
});

Route::post("/register", [AuthenticationController::class, 'register']);
Route::post("/login", [AuthenticationController::class, 'login']);