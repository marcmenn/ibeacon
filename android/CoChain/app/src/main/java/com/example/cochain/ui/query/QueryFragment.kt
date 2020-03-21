package com.example.cochain.ui.query

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProviders
import com.example.cochain.R

class QueryFragment : Fragment() {

    private lateinit var queryViewModel: QueryViewModel

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        queryViewModel =
                ViewModelProviders.of(this).get(QueryViewModel::class.java)
        return inflater.inflate(R.layout.fragment_query, container, false)
    }
}
