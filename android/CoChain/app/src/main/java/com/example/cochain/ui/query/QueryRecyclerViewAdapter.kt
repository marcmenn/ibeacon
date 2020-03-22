package com.example.cochain.ui.query

import android.content.Context
import android.os.Build
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.annotation.RequiresApi
import androidx.recyclerview.widget.RecyclerView
import com.example.cochain.R
import com.example.cochain.beacon.BeaconContact
import com.example.cochain.ui.components.ContactView
import java.time.Instant
import java.time.ZoneId
import java.time.ZoneOffset

class QueryRecyclerViewAdapter(context: Context) :
    RecyclerView.Adapter<QueryRecyclerViewAdapter.BeaconContactHolder>() {
    private var beacons = emptyList<BeaconContact>()

    private val inflater: LayoutInflater = LayoutInflater.from(context)

    inner class BeaconContactHolder(contactView: ContactView) :
        RecyclerView.ViewHolder(contactView) {
        val contactView: ContactView = contactView
    }

    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): QueryRecyclerViewAdapter.BeaconContactHolder {
        return BeaconContactHolder(
            inflater.inflate(
                R.layout.contact_view,
                parent,
                false
            ) as ContactView
        )
    }

    override fun getItemCount() = beacons.size

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onBindViewHolder(
        holder: QueryRecyclerViewAdapter.BeaconContactHolder,
        position: Int
    ) {
        val current = beacons[position]
        holder.contactView.dateTime = Instant.ofEpochMilli(current.lastSeen).atOffset(ZoneOffset.UTC).toLocalDateTime()
        holder.contactView.duration = current.duration
        holder.contactView.distance = current.minimumDistance
    }

    internal fun setBeancons(beacons: List<BeaconContact>) {
        this.beacons = beacons
        notifyDataSetChanged()
    }

}
