package com.example.cochain.ui.query

import android.os.Build
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.cochain.BeaconDataRepository
import com.example.cochain.R
import kotlinx.coroutines.launch

class QueryFragment : Fragment() {

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val root = inflater.inflate(R.layout.fragment_query, container, false)
        val contactViewContainer = root.findViewById<RecyclerView>(R.id.contactViewContainer)
        val queryRecyclerViewAdapter = QueryRecyclerViewAdapter(requireContext())
        contactViewContainer.adapter = queryRecyclerViewAdapter
        contactViewContainer.layoutManager = LinearLayoutManager(this.requireContext())

        val queryViewModel =
            ViewModelProviders.of(this).get(QueryViewModel::class.java)

        queryViewModel.beacons.observe(viewLifecycleOwner, Observer { beacons ->
            beacons?.let { queryRecyclerViewAdapter.setBeancons(beacons) }
        })

        val statusTextView = root.findViewById<TextView>(R.id.textViewStatus)
        statusTextView.text = "Status:\nFit"

        val repository = BeaconDataRepository(requireContext())
        lifecycleScope.launch { repository.deleteAll() }

        return root
    }
}
