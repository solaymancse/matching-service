<?php

namespace App\Http\Controllers;

use App\Models\ServiceName;
use App\Models\UnselectedService;
use Illuminate\Http\Request;

class ServiceController extends Controller
{

    public function create(Request $request)
    {

        try {
            $validateData = $request->validate(([
                'service_name' => 'required',
            ]));

            $data = ServiceName::create($validateData);
            return response()->json([
                'status' => 201,
                'message' => "Created Successfully",
                'data' => $data,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function services()
    {
        try {
            $data = ServiceName::latest()->get();
            return response()->json([
                'status' => 200,
                'message' => "Success",
                'data' => $data,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
            ]);
        }
    }

    // update service
    public function updateService(Request $request, $id)
    {
        try {
            $data = ServiceName::find($id);
            $data->update($request->all());
            return response()->json([
                'status' => 200,
                'message' => "Updated Successfully",
                'data' => $data,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
            ]);
        }
    }

    // delete service
    public function deleteService($id)
    {
        try {
            $data = ServiceName::find($id);
            $data->delete();
            return response()->json([
                'status' => 200,
                'message' => "Deleted Successfully",
                'data' => $data,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
            ]);
        }
    }


}
