package com.example.cochain.ui.query

import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.core.view.get
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.example.cochain.R
import com.example.cochain.ui.beacon.BeaconContactData
import com.example.cochain.ui.components.ContactView
import kotlinx.android.synthetic.main.fragment_query.*
import org.altbeacon.beacon.BeaconData
import java.time.LocalDate

class QueryFragment : Fragment() {

    companion object {
        private const val TAG = "QueryFragment"
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val root = inflater.inflate(R.layout.fragment_query, container, false)
        val contactViewContainer = root.findViewById<LinearLayout>(R.id.contactViewContainer)
        contactViewContainer.removeAllViews()

        val queryViewModel =
            ViewModelProviders.of(this).get(QueryViewModel::class.java)

        queryViewModel.beacons.observe(viewLifecycleOwner, Observer {
            it.values.forEachIndexed { i, data ->
                var contactView =
                    contactViewContainer.getChildAt(i) as ContactView?
                if (null != contactView) {
                    // reuse contactView
                    contactView.date = data.lastSeen
                    contactView.duration = data.duration
                    contactView.distance = data.minimumDistance
                } else {
                    // add new ContactView
                    contactView = ContactView(contactViewContainer.context)
                    contactView.date = data.lastSeen
                    contactView.duration = data.duration
                    contactView.distance = data.minimumDistance
                    contactViewContainer.addView(contactView)
                }
            }
            if (it.size >= 1) {
                val contactView = root.findViewById<ContactView>(R.id.contactView)
                val data = it.values.toTypedArray()[0]
                contactView.date = data.lastSeen
                contactView.duration = data.duration
                contactView.distance = data.minimumDistance
            }
            if (it.size >= 2) {
                val contactView = root.findViewById<ContactView>(R.id.contactView2)
                val data = it.values.toTypedArray()[1]
                contactView.date = data.lastSeen
                contactView.duration = data.duration
                contactView.distance = data.minimumDistance
            }
        })

        val statusTextView = root.findViewById<TextView>(R.id.textViewStatus)
        statusTextView.text = "Status:\nFit"

        for (i in 1..0) {
            queryViewModel.addBeaconContactData(
                BeaconContactData(
                    "device${i}",
                    "beacon${i}",
                    LocalDate.now().minusDays(i.toLong()),
                    i * 2,
                    i,
                    true
                )
            )
        }

        return root
    }
}
