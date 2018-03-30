#!/usr/bin/python
from sense_hat import SenseHat

sense = SenseHat()
tempC = sense.get_temperature()
print("%.1f" % tempC)
