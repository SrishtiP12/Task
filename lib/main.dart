import 'package:flutter/material.dart';
import 'package:prac_flutter/pages/home.dart';

void main() {
  runApp(const MyApp());   //MyApp() is a StatelessWidget that serves as the root of the application.
  // The runApp function takes the given widget and makes it the root of the widget tree
  // that is rendered on the screen.
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'To-Do App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      debugShowCheckedModeBanner: false, // Hides the debug banner in the app
       // The debug banner is a small banner that appears in the top right corner of the app   
      home: HomePage(),
    );
  }
}

