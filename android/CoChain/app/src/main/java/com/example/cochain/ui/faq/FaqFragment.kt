package com.example.cochain.ui.faq

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.example.cochain.R

class FaqFragment : Fragment() {

    private lateinit var faqViewModel: FaqViewModel

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        faqViewModel =
                ViewModelProviders.of(this).get(FaqViewModel::class.java)
        val root = inflater.inflate(R.layout.fragment_faq, container, false)
        val textView: TextView = root.findViewById(R.id.text_notifications)
        faqViewModel.text.observe(viewLifecycleOwner, Observer {
            textView.text = it
        })
        return root
    }
}
