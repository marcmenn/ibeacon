package com.example.cochain.ui.components

import android.content.Context
import android.os.Build
import android.util.AttributeSet
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.constraintlayout.widget.ConstraintLayout
import com.example.cochain.R
import java.time.LocalDate
import java.time.format.DateTimeFormatter

class ContactView : ConstraintLayout {

    private var _date : LocalDate? = null
    private var _distance : Int? = null
    private var _duration : Int? = null

    var date: LocalDate?
        get() = _date
        @RequiresApi(Build.VERSION_CODES.O)
        set(value) {
            _date = value
            val textViewDate = findViewById<TextView>(R.id.textViewDate)
            textViewDate.text = "Date:\n ${_date?.format(DateTimeFormatter.ISO_LOCAL_DATE)}"
        }

    var distance: Int?
        get() = _distance
        set(value) {
            _distance = value
            val textViewDistance = findViewById<TextView>(R.id.textViewDistance)
            textViewDistance.text = "Duration:\n ${_distance}"
        }

    var duration: Int?
        get() = _duration
        set(value) {
            _duration = value
            val textViewDuration = findViewById<TextView>(R.id.textViewDuration)
            textViewDuration.text = "Duration:\n ${_duration}"
        }

    constructor(context: Context) : super(context) {
        init()
    }

    constructor(context: Context, attrs: AttributeSet) : super(context, attrs) {
        init()
    }

    constructor(context: Context, attrs: AttributeSet, defStyle: Int) : super(
        context,
        attrs,
        defStyle
    ) {
        init()
    }

    private fun init() {
        inflate(context, R.layout.contact_view, this)
    }

}
