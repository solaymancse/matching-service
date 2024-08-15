<?php

namespace App\Http\Controllers;

use App\Models\SelectedService;
use App\Models\ServiceName;
use App\Models\UnselectedService;
use Illuminate\Http\Request;

class SelectedServiceController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'service_id' => 'required|exists:service_names,id',
        ]);

        // Store selected service
        $selectedService = SelectedService::create($request->all());

        // Get all services
        $allServices = ServiceName::all();

        // Filter out selected service and add remaining to unselected services
        foreach ($allServices as $service) {
            if ($service->id != $request->service_id) {
                UnselectedService::create([
                    'user_id' => $request->user_id,
                    'service_id' => $service->id,
                ]);
            }
        }

        return response()->json(['message' => 'Service selected and unselected services stored']);
    }
}
