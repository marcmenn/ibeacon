package com.example.cochain.ui.query

import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProviders
import com.example.cochain.R
import com.example.cochain.ui.components.ContactView
import java.time.LocalDate

class QueryFragment : Fragment() {

    private val TAG = "QueryFragment"

    private lateinit var queryViewModel: QueryViewModel

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        queryViewModel =
            ViewModelProviders.of(this).get(QueryViewModel::class.java)
        val root = inflater.inflate(R.layout.fragment_query, container, false)
        val statusTextView = root.findViewById<TextView>(R.id.textViewStatus)
        statusTextView.text = "Status:\nFit"

        val contactView = root.findViewById<ContactView>(R.id.contactView)
        contactView.date = LocalDate.now()
        contactView.duration = 10
        contactView.distance = 15
        val contactView2 = root.findViewById<ContactView>(R.id.contactView2)
        contactView2.date = LocalDate.now().minusDays(1)
        contactView2.duration = 5
        contactView2.distance = 10

        return root
    }
}
