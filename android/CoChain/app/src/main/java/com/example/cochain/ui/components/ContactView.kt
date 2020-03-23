package com.example.cochain.ui.components

import android.content.Context
import android.os.Build
import android.util.AttributeSet
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.constraintlayout.widget.ConstraintLayout
import com.example.cochain.R
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class ContactView : ConstraintLayout {

    private var _dateTime : LocalDateTime? = null
    private var _distance : Double? = null
    private var _duration : Double? = null

    var dateTime: LocalDateTime?
        get() = _dateTime
        @RequiresApi(Build.VERSION_CODES.O)
        set(value) {
            _dateTime = value
            val textViewDate = findViewById<TextView>(R.id.textViewDate)
            textViewDate.text = "Date:\n ${_dateTime?.format(DateTimeFormatter.ISO_LOCAL_DATE)}"
        }

    var distance: Double?
        get() = _distance
        set(value) {
            _distance = value
            val textViewDistance = findViewById<TextView>(R.id.textViewDistance)
            textViewDistance.text = "Distance:\n %.2f".format(distance)
        }

    var duration: Double?
        get() = _duration
        set(value) {
            _duration = value
            val textViewDuration = findViewById<TextView>(R.id.textViewDuration)
            textViewDuration.text = "Duration:\n %.2f".format(duration)
        }

    constructor(context: Context) : super(context)

    constructor(context: Context, attrs: AttributeSet) : super(context, attrs)

    constructor(context: Context, attrs: AttributeSet, defStyle: Int) : super(
        context,
        attrs,
        defStyle
    )
}
