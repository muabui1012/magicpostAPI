<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\OfficeController;
use App\Http\Controllers\Api\ParcelController;
use App\Http\Controllers\api\WarehouseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//JWT routes
Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', [AuthController::class ,'login']);
    // Route::post('logout', [AuthController::class ,'logout']);
    Route::post('refresh', [AuthController::class ,'refresh']);
    Route::post('me', [AuthController::class ,'me']);
    Route::post('register', [AuthController::class, 'register']);

});


// //main routes
// Route::get('parcel', [ParcelController::class, 'index']);
// Route::post('parcel', [ParcelController::class, 'store']);
// Route::get('parcel/{id}', [ParcelController::class, 'show']);
// Route::get('parcel/{id}/edit', [ParcelController::class, 'update']);
// Route::put('parcel/{id}/edit', [ParcelController::class, 'update']);
// Route::get('parcel/{id}/delete', [ParcelController::class, 'destroy']);

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::post('logout', [AuthController::class ,'logout']);
    Route::get('parcel', [ParcelController::class, 'index']);
    Route::post('parcel', [ParcelController::class, 'store']);
    Route::get('parcel/{id}', [ParcelController::class, 'show']);
    Route::get('parcel/{id}/edit', [ParcelController::class, 'update']);
    Route::put('parcel/{id}/edit', [ParcelController::class, 'update']);
    Route::get('parcel/{id}/delete', [ParcelController::class, 'destroy']);
    Route::get('user/', [UserController::class, 'idenUser']);
    Route::get('parcel/find/{code}', [ParcelController::class, 'findByCode']);

    Route::post('office', [OfficeController::class, 'store']);
    Route::put('office/{id}/edit', [OfficeController::class, 'update']);
    Route::put('office/delete', [OfficeController::class, 'destroy']);
    Route::get('office/incomingFromCustomer', [OfficeController::class, 'getIncomingFromCustomer']);
    Route::post('office/sendtowarehouse', [OfficeController::class, 'sendToWarehouse']);

    Route::post('warehouse', [WarehouseController::class, 'store']);
    Route::put('warehouse/{id}/edit', [WarehouseController::class, 'update']);
    Route::put('warehouse/delete', [WarehouseController::class, 'destroy']);
    Route::post('warehouse/sendtoffice', [WarehouseController::class, 'sendToOffice']);
});

Route::get('parcel/{id}', [ParcelController::class, 'show']);
Route::get('parcel/find/{code}', [ParcelController::class, 'findByCode']);
