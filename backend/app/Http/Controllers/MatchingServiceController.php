<?php

namespace App\Http\Controllers;

use App\Models\UnselectedService;
use Illuminate\Http\Request;

class MatchingServiceController extends Controller
{
    public function matchService(Request $request)
    {
        $selectedServiceId = $request->query('selected_service_id');
        $userId = 1; // Assuming static user ID for now

        // Fetch unselected services for the user
        $unselectedServices = UnselectedService::where('user_id', $userId)->with('service')->get();

        // Check if the selected service matches any in the unselected list
        foreach ($unselectedServices as $unselectedService) {
            if ($unselectedService->service_id == $selectedServiceId) {
                return response()->json([
                    'status' => 'matched',
                    'matched_service' => $unselectedService->service->service_name
                ]);
            }
        }

        // If no match is found
        return response()->json([
            'status' => 'no match found'
        ]);
    }
}
