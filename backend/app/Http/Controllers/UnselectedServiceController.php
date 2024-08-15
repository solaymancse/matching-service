<?php

namespace App\Http\Controllers;

use App\Models\UnselectedService;
use Illuminate\Http\Request;

class UnselectedServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getUnselectedServices()
    {
        // Fetch all unselected services
        $unselectedServices = UnselectedService::with('service')->latest()->get();

        // Remove duplicates based on service_id
        $uniqueServices = $unselectedServices->unique('service_id');

        return response()->json([
            'data' => $uniqueServices
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
