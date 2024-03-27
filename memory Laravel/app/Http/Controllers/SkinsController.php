<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Skins;

class SkinsController extends Controller
{
    public function store(Request $request)
    {
        $skin = new Skins;
        $skin->name = $request->name;
        $skin->images = $request->images; // assuming images is an array
        $skin->save();

        return response()->json(['message' => 'Skin created successfully'], 201);
    }

    public function show($id)
    {
        $skin = Skins::find($id);

        if ($skin) {
            return response()->json($skin, 200);
        } else {
            return response()->json(['error' => 'Skin not found'], 404);
        }
    }

    // Add other methods as needed...
}
